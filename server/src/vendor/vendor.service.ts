import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto) {
    return await this.prisma.vendor.create({ data: createVendorDto });
  }

  async findAll() {
    return await this.prisma.vendor.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.vendor.findUnique({ where: { id } });
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    return await this.prisma.vendor.update({
      where: { id },
      data: updateVendorDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.vendor.delete({ where: { id } });
  }
}
