import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVendorDto {
  @ApiPropertyOptional() name: string;
  @ApiPropertyOptional() phone: string;
}
