export let isSystem = true;
export const schoolName = "H. A. K. Academy";
export const schoolNameWithLogo = `🏫 H. A. K. Academy`;

export const changeSystem = (payload) => {
  isSystem = payload;
};

export const isSystemConfig = isSystem;

export const homeHeroImage = {
  src: "assets/home_hero_graphic.png",
  alt: "hero-bg",
};

export const homeHeroDetails = (schoolName) => {
  if (isSystem) {
    return {
      title: `Welcome to our <br/> School Management system`,
      description: "Manage your school easily",
    };
  } else {
    return {
      title: `Welcome to <br/>${schoolName}`,
      description: `Excellence in education for a brighter future`,
    };
  }
};

export const loginPageImage = {
  src: "assets/login_graphic.png",
  alt: "login-bg",
};
