import Image, {ImageLoaderProps, ImageProps} from 'next/image';

import {assetPrefix}  from './../../next.config';

const myLoader = (resolverProps: ImageLoaderProps) => {
  return `${assetPrefix}_next/image?url=${resolverProps.src}&w=${resolverProps.width}&q=${resolverProps.quality || 70}`;
}

const ImageWithAssetPrefix: typeof Image = (props: ImageProps) => {
  return <Image {...props} loader={myLoader} unoptimized={true} className={"p-5"}/>;
};

export default ImageWithAssetPrefix;