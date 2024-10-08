export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Campaign',
      route: '/campaigns/create',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  export const CampaignDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }