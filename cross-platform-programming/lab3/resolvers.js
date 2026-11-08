import bcrypt from 'bcryptjs';
import { users, services, getNextUserId, getNextServiceId } from './data.js';
import { createToken } from './auth.js';

function requireUser(context) {
  if (!context.user) throw new Error('Потрібна авторизація.');
  return context.user;
}
export const resolvers = {
  Query: {
    users: () => users,
    me: (_parent, _args, context) => context.user,
    services: () => services,
    service: (_parent, { id }) => services.find((s) => s.id === id) ?? null,
  },
  Mutation: {
    register: async (_parent, { name, email, password }) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!name.trim() || !normalizedEmail || password.length < 6) {
        throw new Error('Вкажіть ім’я, email і пароль від 6 символів.');
      }
      if (users.some((user) => user.email === normalizedEmail)) {
        throw new Error('Користувач з таким email вже існує.');
      }
      const user = {
        id: getNextUserId(), name: name.trim(), email: normalizedEmail,
        passwordHash: await bcrypt.hash(password, 10),
      };
      users.push(user);
      return { token: createToken(user), user };
    },
    login: async (_parent, { email, password }) => {
      const user = users.find((item) => item.email === email.trim().toLowerCase());
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new Error('Неправильний email або пароль.');
      }
      return { token: createToken(user), user };
    },
    createService: (_parent, args, context) => {
      const owner = requireUser(context);
      if (!args.name.trim() || !args.description.trim() || !args.category.trim() || args.price < 0 || args.duration < 1) {
        throw new Error('Некоректні дані послуги.');
      }
      const service = { id: getNextServiceId(), ...args, owner };
      services.push(service);
      return service;
    },
    deleteService: (_parent, { id }, context) => {
      const user = requireUser(context);
      const index = services.findIndex((s) => s.id === id);
      if (index < 0) return false;
      if (services[index].owner.id !== user.id) throw new Error('Видалити послугу може лише її власник.');
      services.splice(index, 1);
      return true;
    },
  },
};
