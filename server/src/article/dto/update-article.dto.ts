import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiPropertyOptional() label: string;
  @ApiPropertyOptional() image: string;
  @ApiPropertyOptional() amount: number;
  @ApiPropertyOptional() vendorId: string;
}
