import React from 'react';
import { IMAGE_PATHS } from '../../../shared/constants/imagePaths';

const LoginImage = () => (
  <div className="w-1/2 hidden md:block">
    <img src={IMAGE_PATHS.login_image} alt="Login illustration" className="object-cover h-full w-full" />
  </div>
);

export default LoginImage;
