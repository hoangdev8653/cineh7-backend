import { Injectable, NotFoundException } from "@nestjs/common";
import { CloudinaryService } from "@libs/cloudinary";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TheaterSystem } from "./theater-system.entities"
import { CreateTheaterSystemDto, UpdateTheaterSystemDto } from "@libs/common";



@Injectable()
export class TheaterSystemService {
    constructor(
        @InjectRepository(TheaterSystem)
        private theaterSystemRepository: Repository<TheaterSystem>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async createTheaterSystem(createTheaterSystemDto: CreateTheaterSystemDto, file: Express.Multer.File) {
        if (file) {
            const image = await this.cloudinaryService.uploadFile(file);
            createTheaterSystemDto.logo = image.url;
        }
        const theaterSystem = this.theaterSystemRepository.create(createTheaterSystemDto);
        return await this.theaterSystemRepository.save(theaterSystem);
    }

    async getAllTheaterSystems() {
        const data = await this.theaterSystemRepository.find();
        return data;
    }

    async getTheaterSystemById(id: string) {
        const data = await this.theaterSystemRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException("Không tìm thấy hệ thống rạp");
        }
        return data;
    }

    async updateTheaterSystem(id: string, updateTheaterSystemDto: UpdateTheaterSystemDto) {
        const theaterSystem = await this.theaterSystemRepository.findOne({ where: { id } });
        if (!theaterSystem) {
            throw new NotFoundException("Không tìm thấy hệ thống rạp");
        }
        return await this.theaterSystemRepository.save({ ...theaterSystem, ...updateTheaterSystemDto });
    }

    async deleteTheaterSystem(id: string) {
        const theaterSystem = await this.theaterSystemRepository.findOne({ where: { id } });
        if (!theaterSystem) {
            throw new NotFoundException("Không tìm thấy hệ thống rạp");
        }
        return await this.theaterSystemRepository.remove(theaterSystem);
    }
}