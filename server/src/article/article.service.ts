import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async findAll() {
    return await this.prisma.article.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
