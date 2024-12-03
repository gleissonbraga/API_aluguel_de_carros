import request from 'supertest';
import app from '../app';
import { UsersRepository } from './UsersRepository';


describe('GET user/:id', () => {
  it('should return a user without a password when a valid ID is provided', async () => {
    const mockId = 1;

    
    jest.spyOn(UsersRepository, 'findUserById').mockResolvedValueOnce({
      id_user: mockId,
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    
    const response = await request(app).get(`/users/${mockId}`);

    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id_user: mockId,
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      createdAt: expect.any(String), 
      updatedAt: expect.any(String),
    });
  });

  it('deve retornar 404 se nenhum usuário for encontrado para o ID fornecido', async () => {
    const mockId = 999; 

    
    jest.spyOn(UsersRepository, 'findUserById').mockResolvedValueOnce(null);

    
    const response = await request(app).get(`/users/${mockId}`);


    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
