import {describe} from "node:test";
import {DeepMockProxy, mockDeep, MockProxy} from "jest-mock-extended/lib/Mock";
import {User} from "../../../src/domain/vo/user/User";
import {mock, mockReset} from "jest-mock-extended";
import {UserRepositoryImpl} from "../../../src/data/repository/UserRepositoryImpl";
import {UserDAO} from "../../../src/data/dao/UserDAO";
import {UserMapper} from "../../../src/data/mapper/UserMapper";
import {UserRolesMapper} from "../../../src/data/mapper/UserRolesMapper";
import {UserEntity} from "../../../src/data/entity/UserEntity";
import {EntityManager, SelectQueryBuilder} from "typeorm";

describe('UserRepositoryImpl class tests', () => {
    let userDAO: DeepMockProxy<UserDAO>;
    let userMapper: MockProxy<UserMapper>;
    let userRolesMapper: MockProxy<UserRolesMapper>;
    let entityManager: MockProxy<EntityManager>;
    let userSelectQueryBuilder: MockProxy<SelectQueryBuilder<UserEntity>>;

    let repository: UserRepositoryImpl;

    beforeEach(() => {
        userDAO = mockDeep<UserDAO>();
        userMapper = mock<UserMapper>();
        userRolesMapper = mock<UserRolesMapper>();
        entityManager = mock<EntityManager>();
        userSelectQueryBuilder = mock<SelectQueryBuilder<UserEntity>>();

        repository = new UserRepositoryImpl(userDAO, userMapper, userRolesMapper);
    });

    afterEach(() => {
        mockReset(userDAO);
        mockReset(userMapper);
        mockReset(userRolesMapper);
        mockReset(entityManager);
        mockReset(userSelectQueryBuilder);

        jest.restoreAllMocks();
    })

    // test('Should create an user successfully when create method is executed', async () => {
    //     // Prepare
    //
    //     let user = new User(
    //         0,
    //         'username',
    //         'User',
    //         'user@email.com',
    //         'teste123',
    //         true,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let userEntity = new UserEntity(
    //         0,
    //         'username',
    //         'User',
    //         'user@email.com',
    //         '$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q',
    //         true,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let newUserEntity = new UserEntity(
    //         1,
    //         'username',
    //         'User',
    //         'user@email.com',
    //         '$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q',
    //         true,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let createdUser = new User(
    //         1,
    //         'username',
    //         'User',
    //         'user@email.com',
    //         '$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q',
    //         true,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let userRoles = new UserRoles(
    //         0,
    //         0,
    //         true,
    //         false,
    //         false,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let userRolesEntity = new UserRolesEntity(
    //         0,
    //         0,
    //         true,
    //         false,
    //         false,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     let newUserRolesEntity = new UserRolesEntity(
    //         1,
    //         1,
    //         true,
    //         false,
    //         false,
    //         new Date(2025, 0, 1, 0, 0, 0),
    //         new Date(2025, 0, 1, 0, 0, 0)
    //     );
    //
    //     userMapper.toUserEntity.calledWith(user).mockReturnValue(userEntity);
    //
    //     userRolesMapper.toUserRolesEntity.calledWith(userRoles).mockReturnValue(userRolesEntity);
    //
    //     const options: SaveOptions | undefined = undefined;
    //
    //     // @ts-ignore
    //     entityManager.save.calledWith(userEntity, options).mockReturnValue(Promise.resolve(newUserEntity));
    //     // @ts-ignore
    //     entityManager.save.calledWith(userRolesEntity, options).mockReturnValue(Promise.resolve(newUserRolesEntity));
    //
    //     userMapper.fromUserEntity.calledWith(newUserEntity).mockReturnValue(createdUser);
    //
    //     // Act
    //
    //     const newUserPromise = repository.create(user, userRoles);
    //
    //     const transactionFunction = userDAO.manager.transaction.mock.calls[0][0];
    //
    //     // @ts-ignore
    //     await transactionFunction(entityManager);
    //
    //     newUserPromise.then((newUser) => {
    //         // Assert
    //
    //         expect(newUser).toBeDefined();
    //
    //         expect(newUser.id).toEqual(1);
    //         expect(newUser.username).toEqual('username');
    //         expect(newUser.name).toEqual('User');
    //         expect(newUser.email).toEqual('user@email.com');
    //         expect(newUser.password).toEqual('$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q');
    //         expect(newUser.active).toBeTruthy();
    //         expect(newUser.createdAt).toEqual(new Date(2025, 0, 1, 0, 0, 0));
    //         expect(newUser.updatedAt).toEqual(new Date(2025, 0, 1, 0, 0, 0));
    //
    //         expect(userMapper.toUserEntity).toHaveBeenCalledWith(user);
    //         expect(userRolesMapper.toUserRolesEntity).toHaveBeenCalledWith(userRoles);
    //
    //         expect(userDAO.manager.transaction).toHaveBeenCalledWith(transactionFunction);
    //
    //         expect(entityManager.save).toHaveBeenCalledWith(userEntity);
    //         expect(entityManager.save).toHaveBeenCalledWith(userRolesEntity);
    //
    //         expect(userMapper.fromUserEntity).toHaveBeenCalledWith(newUserEntity);
    //     });
    // });

    test('Should retrieve an user successfully when getUserByUsername method is executed', async () => {
        // Prepare

        const userEntity = new UserEntity(
            1,
            'username',
            'User',
            'user@email.com',
            '$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q',
            true,
            new Date(2025, 0, 1, 0, 0, 0),
            new Date(2025, 0, 1, 0, 0, 0)
        );

        const user = new User(
            1,
            'username',
            'User',
            'user@email.com',
            '$2b$10$cLCx2K/n.fifXma00IqTzeG3cjK2k6GHAMhFEHvnwX9ag4XFUdY5q',
            true,
            new Date(2025, 0, 1, 0, 0, 0),
            new Date(2025, 0, 1, 0, 0, 0)
        );

        userDAO.createQueryBuilder.calledWith('user').mockReturnValue(userSelectQueryBuilder);

        userSelectQueryBuilder.where.calledWith('LOWER(user.username) = LOWER(\'username\')')
            .mockReturnValue(userSelectQueryBuilder);

        userSelectQueryBuilder.getOne.mockReturnValue(Promise.resolve(userEntity));

        userMapper.fromUserEntity.calledWith(userEntity).mockReturnValue(user);

        // Act

        const existingUser = await repository.getByUsername('username');

        // Assert

        expect(existingUser).toEqual(user);

        expect(userDAO.createQueryBuilder).toHaveBeenCalledWith('user');
        expect(userSelectQueryBuilder.where).toHaveBeenCalledWith('LOWER(user.username) = LOWER(\'username\')');
        expect(userSelectQueryBuilder.getOne).toHaveBeenCalled();
        expect(userMapper.fromUserEntity).toHaveBeenCalledWith(userEntity);
    });

    test('Should not retrieve an user successfully when getUserByUsername method is executed', async () => {
        // Prepare
        userDAO.createQueryBuilder.calledWith('user').mockReturnValue(userSelectQueryBuilder);

        userSelectQueryBuilder.where.calledWith('LOWER(user.username) = LOWER(\'username\')')
            .mockReturnValue(userSelectQueryBuilder);

        userSelectQueryBuilder.getOne.mockReturnValue(Promise.resolve(null));

        // Act

        const existingUser = await repository.getByUsername('username');

        // Assert

        expect(existingUser).toBeUndefined();

        expect(userDAO.createQueryBuilder).toHaveBeenCalledWith('user');
        expect(userSelectQueryBuilder.where).toHaveBeenCalledWith('LOWER(user.username) = LOWER(\'username\')');
        expect(userSelectQueryBuilder.getOne).toHaveBeenCalled();
    });
});