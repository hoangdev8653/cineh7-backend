import { Controller } from '@nestjs/common';
import { TheaterSystemService } from './theater-system.service';
import {
  CreateTheaterSystemDto,
  UpdateTheaterSystemDto,
  THEATER_SYSTEM_CMD,
} from '@libs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TheaterSystemController {
  constructor(private readonly theaterSystemService: TheaterSystemService) {}

  @MessagePattern({ cmd: THEATER_SYSTEM_CMD.GET_ALL })
  async getAllTheaterSystems() {
    const theaterSystems =
      await this.theaterSystemService.getAllTheaterSystems();
    return {
      message: 'Lấy danh sách hệ thống rạp thành công',
      data: theaterSystems,
    };
  }

  @MessagePattern({ cmd: THEATER_SYSTEM_CMD.CREATE })
  async createTheaterSystem(
    @Payload()
    data: {
      createTheaterSystemDto: CreateTheaterSystemDto;
      file: Express.Multer.File;
    },
  ) {
    const result = await this.theaterSystemService.createTheaterSystem(
      data.createTheaterSystemDto,
      data.file,
    );
    return {
      message: 'Tạo hệ thống rạp thành công',
      data: result,
    };
  }

  @MessagePattern({ cmd: THEATER_SYSTEM_CMD.GET_BY_ID })
  async getTheaterSystemById(@Payload() id: string) {
    const theaterSystem =
      await this.theaterSystemService.getTheaterSystemById(id);
    return {
      message: 'Lấy thông tin hệ thống rạp thành công',
      data: theaterSystem,
    };
  }

  @MessagePattern({ cmd: THEATER_SYSTEM_CMD.UPDATE })
  async updateTheaterSystem(
    @Payload()
    data: {
      id: string;
      updateTheaterSystemDto: UpdateTheaterSystemDto;
    },
  ) {
    const theaterSystem = await this.theaterSystemService.updateTheaterSystem(
      data.id,
      data.updateTheaterSystemDto,
    );
    return {
      message: 'Cập nhật hệ thống rạp thành công',
      data: theaterSystem,
    };
  }

  @MessagePattern({ cmd: THEATER_SYSTEM_CMD.DELETE })
  async deleteTheaterSystem(@Payload() id: string) {
    const theaterSystemDeleted =
      await this.theaterSystemService.deleteTheaterSystem(id);
    return {
      message: 'Xóa hệ thống rạp thành công',
      data: theaterSystemDeleted,
    };
  }
}
