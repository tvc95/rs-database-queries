import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  /** ok **/
  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const user = await this.repository.findOne({
      relations: ['games'],
      where: {
        id: user_id
      }
    });

    return user;
  }

  /** ok **/
  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query(`
      SELECT * FROM users
      ORDER BY first_name ASC;
    `);

    return users;
  }

  /** ok **/
  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user = await this.repository.query(`
      SELECT * FROM users
      WHERE LOWER(first_name) = LOWER('${first_name}') AND LOWER(last_name) = LOWER('${last_name}')
    `);

    return user;
  }
}
