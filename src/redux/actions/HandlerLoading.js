export const SHOW = 'SHOW';
export const HIDE = 'HIDE';

export const handleShowLoading = () => {
  return { type: SHOW };
};

export const handleHideLoading = () => {
  return { type: HIDE };
};
