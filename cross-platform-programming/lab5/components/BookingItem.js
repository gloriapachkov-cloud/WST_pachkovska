import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from './UI';
import { styles } from './styles';

const money = n => `${n} ₴`;
const displayDate = d => d ? d.split('-').reverse().join('.') : '';

export default function BookingItem({ appointment: a, role, onUpdateStatus, onCancel, onDelete }) {
  return (
                <Card>
                  <View style={styles.appointmentTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.serviceTitle}>
                        {a.name}
                      </Text>

                      <Text style={styles.note}>
                        {a.serviceName}
                      </Text>

                      {role !== 'Клієнт' && (
                        <Text style={styles.note}>
                          Телефон: {a.phone || 'Не вказано'}
                        </Text>
                      )}

                      <Text style={styles.note}>
                        {a.masterName} ·{' '}
                        {displayDate(a.date)}
                        {' · '}{a.time}
                      </Text>

                      <Text style={styles.priceLine}>
                        {money(a.price)}
                        {' · '}{a.minutes} хв
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.status,
                        a.status === 'Виконано' &&
                          styles.done,
                      ]}
                    >
                      {a.status}
                    </Text>
                  </View>

                  {role !== 'Клієнт' &&
                    a.status !== 'Скасовано' &&
                    a.status !== 'Виконано' && (
                      <Button
                        title="Змінити статус"
                        secondary
                        onPress={() => onUpdateStatus(a)}
                      />
                    )}

                  {a.status !== 'Скасовано' &&
                    a.status !== 'Виконано' && (
                      <Button
                        title="Скасувати запис"
                        secondary
                        onPress={() => onCancel(a)}
                      />
                    )}
                  <Button title="Видалити запис" secondary onPress={() => onDelete(a)} />
                </Card>
  );
}
