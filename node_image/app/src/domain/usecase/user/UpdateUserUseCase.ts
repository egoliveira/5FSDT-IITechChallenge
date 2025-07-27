import {User} from "../../vo/user/User";
import {UseCase} from "../UseCase";
import {inject, injectable} from "tsyringe";
import {UserRepository} from "../../repository/UserRepository";

@injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseParams, User | undefined> {
    constructor(
        @inject("UserRepository") private readonly userRepository: UserRepository
    ) {
    }

    async execute(params: UpdateUserUseCaseParams): Promise<User | undefined> {
        return this.userRepository.update(params.id, params.name, params.email, params.active);
    }
}

export class UpdateUserUseCaseParams {
    constructor(
        readonly id: number,
        readonly name?: string,
        readonly email?: string,
        readonly active?: boolean
    ) {
    }
}