import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenJson } from './auth.pb';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './dto/auth.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject(UsersService)
    private readonly usersService: UsersService;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register(reg: RegisterRequestDto) {
        console.log("🚀 ~ AuthService ~ register ~ reg:", reg)
        let auth = await this.usersService.getOne({ email: reg.email });

        if (auth) {
            return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }

        auth = new User();

        auth.name = reg.name;
        auth.avatar = reg.avatar;
        auth.phone = reg.phone;
        auth.email = reg.email;
        auth.password = await this.genPassword(reg.password);
        await auth.save();

        return { data: auth.dataValues };
    }

    public async login({ email, password }: LoginRequestDto) {
        console.log("🚀 ~ AuthService ~ login ~ email:", email)
        const user = await this.usersService.getOne({ email });

        console.log("🚀 ~ AuthService ~ login ~ user:", user)
        if (!user) {
            return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'] };
        }

        const isPasswordValid: boolean = this.comparePassword(password, user.password);
        console.log("🚀 ~ AuthService ~ login ~ isPasswordValid:", isPasswordValid)

        if (!isPasswordValid) {
            return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'] };
        }

        const data: TokenJson = await this.signToken(user);

        return { data };
    }

    public async validate({ token }: ValidateRequestDto) {
        const decoded = await this.jwtService.verify(token);
        console.log("🚀 ~ AuthService ~ validate ~ decoded:", decoded)

        if (!decoded) {
            return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], data: null };
        }

        const user = await this.usersService.getOne({ email: decoded.email });

        if (!user) {
            return { status: HttpStatus.CONFLICT, error: ['User not found'], data: null };
        }

        return { data: decoded.id };
    }

    private async genPassword(str: string) {
        return await bcrypt.hash(str, bcrypt.genSaltSync(8));
    };

    private comparePassword(input: string, hashed: string) {
        return bcrypt.compareSync(input, hashed);
    };

    private async signToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: "1d",
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: "2d",
        });
        return { accessToken, refreshToken };
    }

}
