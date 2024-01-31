import { Gallery } from '../components/GalleryItem';

export type UserNote = {
  id: string;
  title: string;
  description: string;
  galleryItems: Gallery[];
};
