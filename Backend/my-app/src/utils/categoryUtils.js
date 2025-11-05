// Utility helpers for category handling

export const getCategoryLabel = (catObj, idx) => {
  if (typeof catObj === "string") return catObj;
  return catObj?.name || catObj?.title || catObj?.label || `kategori-${idx}`;
};
