import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign Up new User' })
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Email or Phone has already existed.',
  })
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Sign In to get Access Token' })
  @ApiOkResponse({
    description: 'Access token response',
    schema: {
      properties: {
        access_token: {
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ikh1eW5oIER1b25nIiwiZW1haWwiOiJ0cnVuZ2R1b25nMTIyMDI2MTlAZ21haWwuY29tIiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjg5MjM3MjgyLCJleHAiOjE2ODkyNDA4ODJ9.dkUbqCSL5lPEwGvlAJS7cXVXuFiduWNELjXuQZtvShY',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User does not exist.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid password',
  })
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
