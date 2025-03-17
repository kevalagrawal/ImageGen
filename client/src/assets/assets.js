import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import please from './please.jpg'
import dhruv from './dhruv1.jpg'
import eye from './eye.svg'
import camera2 from './camera2.svg'
import logo2 from './logo2.svg'
import profile_icon from './profile_icon.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import user_icon1 from './user_icon1.png'
import download2 from './download (2).png'
import download3 from './download (3).png'
import download4 from './download (4).png'
import download5 from './download (5).png'
import download6 from './download (6).png'
import download7 from './download (7).png'
import download9 from './download (9).png'

export const assets = {
    logo,
    logo2,
    eye,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    dhruv,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    camera2,
    star_group,
    credit_star,
    profile_icon,
    razorpay_logo,
    stripe_logo,
    user_icon1,
    download2,
    download3,
    download4,
    download5,
    download6,
    download7,
    download9,
    please,
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

  export const testimonialsData = [
    {
        image: profile_img_2,
        name: 'Om Patel',
        role: 'Backend Developer',
        stars: 5,
        text: `Image_Gen has been a game-changer for my projects. The seamless background removal allows me to create clean, professional designs in seconds without relying on complex software.`
    },
    {
        image: profile_img_1,
        name: 'Dhruv Soni',
        role: 'Frontend Developer',
        stars: 5,
        text: `As someone who works with various web applications, integrating Image_Gen images was straightforward and efficient. The speed and accuracy of the service make it an essential tool for automation.`
    },
    {
        image: profile_img_2,
        name: 'Harsh Moreshwar',
        role: 'Tester',
        stars: 5,
        text: `I've tested multiple background removal tools, and Image_Gen stands out with its precision and consistency. It handles complex edges and fine details exceptionally well, making it my top recommendation.`
    },
];



export const plans = [
  {
    id: 'Basic',
    price: 9,
    credits: 50,
    desc: 'Best for personal use.'
  },
  {
    id: 'Advanced',
    price: 29,
    credits: 150,
    desc: 'Best for business use.'
  },
  {
    id: 'Business',
    price: 69,
    credits: 500,
    desc: 'Best for enterprise use.'
  },
];