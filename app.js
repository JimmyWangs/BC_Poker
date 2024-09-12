import { Gallery, Iframe } from './image-list.js';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

const createIframe = async () => {
  try {
    // 创建一个包裹 iframe 的 div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.width = '100vw';
    wrapperDiv.style.height = '100vh';
    wrapperDiv.style.position = 'fixed';
    wrapperDiv.style.bottom = '0';
    wrapperDiv.style.left = '0';
    wrapperDiv.style.zIndex = '1000';
    wrapperDiv.style.transform = 'translateX(0)';
    wrapperDiv.style.opacity = '1';
    wrapperDiv.style.transition = 'transform 0.3s ease-in-out';
    
    // 创建 iframe 并设置 src
    const myIframe = document.createElement('iframe');
    myIframe.src = Iframe.url;
    myIframe.style.width = '100%';
    myIframe.style.height = '100%';
    myIframe.style.border = 'none'; // 去掉默认边框

    // 将 iframe 添加到 div 中
    wrapperDiv.append(myIframe);

    // 将 div 添加到 body 中
    document.body.append(wrapperDiv);
  } catch (error) {
    console.error(error);
  }
};


registerServiceWorker();
createIframe();
Gallery.images.map(createGalleryFigure);