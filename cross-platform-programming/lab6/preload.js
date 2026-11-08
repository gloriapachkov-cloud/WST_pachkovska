'use strict';
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('rebelle', Object.freeze({
  login: (data) => ipcRenderer.invoke('auth:login', data),
  register: (data) => ipcRenderer.invoke('auth:register', data),
  logout: () => ipcRenderer.invoke('auth:logout'),
  load: () => ipcRenderer.invoke('data:load'),
  addBooking: (data) => ipcRenderer.invoke('booking:add', data),
  changeStatus: (id, status) => ipcRenderer.invoke('booking:status', id, status),
  deleteBooking: (id) => ipcRenderer.invoke('booking:delete', id),
  addService: (data) => ipcRenderer.invoke('service:add', data),
  deleteService: (id) => ipcRenderer.invoke('service:delete', id),
  addMaster: (data) => ipcRenderer.invoke('master:add', data),
  deleteMaster: (id) => ipcRenderer.invoke('master:delete', id)
}));
