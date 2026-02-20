import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import User from '../models/User';

// Google OAuth Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails?.[0]?.value },
        { providerId: profile.id }
      ]
    });

    if (user) {
      // Update provider info if needed
      if (!user.providerId) {
        user.providerId = profile.id;
        user.provider = 'google';
        user.avatar = profile.photos?.[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = new User({
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      provider: 'google',
      providerId: profile.id,
      avatar: profile.photos?.[0]?.value
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
  }));
}

// GitHub OAuth Strategy (only if credentials are provided)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.emails?.[0]?.value },
        { providerId: profile.id }
      ]
    });

    if (user) {
      // Update provider info if needed
      if (!user.providerId) {
        user.providerId = profile.id;
        user.provider = 'github';
        user.avatar = profile.photos?.[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user
    user = new User({
      name: profile.displayName || profile.username,
      email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
      provider: 'github',
      providerId: profile.id,
      avatar: profile.photos?.[0]?.value
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
  }));
}

// Custom Social Media App OAuth Strategy (only if credentials are provided)
if (process.env.CUSTOM_APP_CLIENT_ID && process.env.CUSTOM_APP_CLIENT_SECRET) {
  passport.use('custom-app', new OAuth2Strategy({
    authorizationURL: process.env.CUSTOM_APP_AUTH_URL || 'https://your-social-app.com/oauth/authorize',
    tokenURL: process.env.CUSTOM_APP_TOKEN_URL || 'https://your-social-app.com/oauth/token',
    clientID: process.env.CUSTOM_APP_CLIENT_ID,
    clientSecret: process.env.CUSTOM_APP_CLIENT_SECRET,
    callbackURL: "/api/auth/custom-app/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Fetch user profile from your social media app
      const userProfileResponse = await fetch(process.env.CUSTOM_APP_PROFILE_URL || 'https://your-social-app.com/api/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const userProfile = await userProfileResponse.json();
      
      // Check if user exists
      let user = await User.findOne({ 
        $or: [
          { email: userProfile.email },
          { providerId: userProfile.id }
        ]
      });

      if (user) {
        // Update provider info if needed
        if (!user.providerId) {
          user.providerId = userProfile.id;
          user.provider = 'custom-app';
          user.avatar = userProfile.avatar;
          await user.save();
        }
        return done(null, user);
      }

      // Create new user
      user = new User({
        name: userProfile.name || userProfile.username,
        email: userProfile.email || `${userProfile.username}@custom-app.local`,
        provider: 'custom-app',
        providerId: userProfile.id,
        avatar: userProfile.avatar
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
