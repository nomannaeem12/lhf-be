import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async getFilteredUsers(
    page = 1,
    pageSize = 10,
    searchText?: string,
    sortField?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{ users: User[]; totalCount: number }> {
    let queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder = queryBuilder.orderBy(
      `user.${sortField}`,
      sortOrder === 'asc' ? 'ASC' : 'DESC',
    );

    queryBuilder = queryBuilder.skip(page * pageSize).take(pageSize);

    if (searchText) {
      const queryParam = `%${searchText}%`;
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('CAST(user.id AS text) ILike :id', { id: queryParam })
            .orWhere('user.fullName ILike :fullName', {
              fullName: queryParam,
            })
            .orWhere('user.email ILike :email', { email: queryParam })
            .orWhere(
              `TO_CHAR(CAST(user.createdAt AS DATE), 'MM/DD/YY') ILike :createdAt`,
              {
                createdAt: queryParam,
              },
            );
        }),
      );
    }

    const [users, totalCount] = await queryBuilder.getManyAndCount();

    return { users, totalCount };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string, selectPassword: boolean) {
    return await this.userRepository.findOne({
      where: { email },
      select: {
        fullName: true,
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        password: selectPassword,
      },
    });
  }
}
