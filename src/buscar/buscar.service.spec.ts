import { Test, TestingModule } from '@nestjs/testing';
import { BuscarService } from './buscar.service';

describe('BuscarService', () => {
  let service: BuscarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuscarService],
    }).compile();

    service = module.get<BuscarService>(BuscarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
