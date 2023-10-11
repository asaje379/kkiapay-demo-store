import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty() name: string;
  @ApiProperty() phone: string;
}
