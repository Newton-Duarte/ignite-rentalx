import { Specification } from '../model/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationService };
