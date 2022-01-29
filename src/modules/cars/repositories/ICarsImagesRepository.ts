import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateCarsImagesDTO {
  car_id: string;
  image_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarsImagesDTO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateCarsImagesDTO };
