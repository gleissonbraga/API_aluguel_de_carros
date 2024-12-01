import request from 'supertest';
import app from '../app'; // Importe o servidor configurado
import { UsersRepository } from './UsersRepository'; // Importe o repositório de usuários

// Descrevendo o conjunto de testes
describe('GET user/:id', () => {
  it('should return a user without a password when a valid ID is provided', async () => {
    const mockId = 1;

    // Simulando o retorno da função 'findUserById' do repositório
    jest.spyOn(UsersRepository, 'findUserById').mockResolvedValueOnce({
      id_user: mockId,
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Fazendo a requisição com Supertest
    const response = await request(app).get(`/users/${mockId}`);

    // Verificando o código de status e o corpo da resposta
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id_user: mockId,
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      createdAt: expect.any(String), // Verifica se a data é do tipo String (ISO)
      updatedAt: expect.any(String),
    });
  });

  it('deve retornar 404 se nenhum usuário for encontrado para o ID fornecido', async () => {
    const mockId = 999; // ID não existente

    // Simulando o retorno da função 'findUserById' para não encontrar o usuário
    jest.spyOn(UsersRepository, 'findUserById').mockResolvedValueOnce(null);

    // Fazendo a requisição com Supertest
    const response = await request(app).get(`/users/${mockId}`);

    // Verificando o código de status e a mensagem de erro
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
