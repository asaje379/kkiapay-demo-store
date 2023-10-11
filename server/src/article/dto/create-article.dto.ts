import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty() label: string;
  @ApiProperty() image: string;
  @ApiProperty() amount: number;
  @ApiProperty() vendorId: string;
}
