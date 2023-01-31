import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EdicionDto {
  @IsNotEmpty()
  @IsString()
  edicion: string;
  @IsNotEmpty()
  @IsNumber()
  anyo: number;
}
