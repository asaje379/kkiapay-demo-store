import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vendors')
@ApiTags('Marchands')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    return await this.vendorService.create(createVendorDto);
  }

  @Get()
  async findAll() {
    return await this.vendorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vendorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return await this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vendorService.remove(id);
  }
}
