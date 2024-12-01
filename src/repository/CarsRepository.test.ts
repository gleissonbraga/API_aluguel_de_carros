import { CarsRepository } from './CarsRepository';
import { db_query_params } from '../config/db';

jest.mock('../config/db', () => ({
  db_connect: jest.fn(),
  db_query: jest.fn(),
  db_query_params: jest.fn(),
}));

describe('CarsRepository - findCarByPlate', () => {
  it('deve devolver o carro quando uma placa válida for fornecida', async () => {
    const mockPlate = 'abc1d23';
    const mockResult = {
      rows: [
        {
          id_carro: 1,
          marca: 'toyota',
          modelo: 'corolla',
          tipo: 'sedan',
          placa: 'abc1d23',
          cor: 'preto',
          ano: '2020',
          status: 'available',
          preco_compra: 80000,
          preco_venda: 100000,
          preco_aluguel: 200,
          created_at: new Date(),
        },
      ],
    };

    (db_query_params as jest.Mock).mockResolvedValue(mockResult);

    const car = await CarsRepository.findCarByPlate(mockPlate);

    expect(db_query_params).toHaveBeenCalledWith(
      'SELECT * FROM cars WHERE placa = $1',
      [mockPlate]
    );
    expect(car).toEqual(mockResult.rows[0]);
  });

  it('deverá retornar nulo caso a placa não exista no banco de dados', async () => {
    const mockPlate = 'xyz9a88';
    const mockResult = { rows: [] };

    (db_query_params as jest.Mock).mockResolvedValue(mockResult);

    const car = await CarsRepository.findCarByPlate(mockPlate);

    expect(db_query_params).toHaveBeenCalledWith(
      'SELECT * FROM cars WHERE placa = $1',
      [mockPlate]
    );
    expect(car).toBeNull();
  });

  it('deve retornar falso se a placa for inválida', async () => {
    const invalidPlate = 'invalid-plate';

    const car = await CarsRepository.findCarByPlate(invalidPlate);

    expect(car).toBe(false);
    expect(db_query_params).not.toHaveBeenCalled();
  });
});
