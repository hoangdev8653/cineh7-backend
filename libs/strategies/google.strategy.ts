import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(config: ConfigService) {
        const clientID = config.get('GOOGLE_CLIENT_ID') || "871093022714-8psbro6kp5er0g0o5h3lnomebhtbbmg6.apps.googleusercontent.com";
        const clientSecret = config.get('GOOGLE_CLIENT_SECRET') || "GOCSPX-6ZD6ZD6ZD6ZD6ZD6ZD6ZD6ZD6";
        const callbackURL = config.get('GOOGLE_CALLBACK_URL') || "http://localhost:3001/auth/google/callback";

        console.log('Google Auth Config:', {
            clientID: clientID ? 'Set' : 'Missing',
            clientSecret: clientSecret ? 'Set' : 'Missing',
            callbackURL
        });

        if (!clientID || !clientSecret || !callbackURL) {
            throw new Error('Missing Google OAuth Credentials');
        }

        super({
            clientID,
            clientSecret,
            callbackURL,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ) {
        return profile;
    }
}