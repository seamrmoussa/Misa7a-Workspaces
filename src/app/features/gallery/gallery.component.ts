import { Component, computed, signal } from '@angular/core';
interface GalleryImage {
  id: number;
  src: string;
  category: string;
  alt: string;
}
@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  // استخدام الـ Signals (أحدث وأسرع طريقة في Angular 16+)
  activeCategory = signal<string>('All Spaces');

  categories: string[] = ['All Spaces', 'Meeting Rooms', 'Common Areas', 'Private Offices'];

  // بيانات الصور (قم بتعديل مسارات الصور حسب مشروعك)
  allImages: GalleryImage[] = [
    {
      id: 1,
      src: './img/gallery1.png',
      category: 'Private Offices',
      alt: 'Private Office Desk',
    },
    {
      id: 2,
      src: './img/gallery2.png',
      category: 'Meeting Rooms',
      alt: 'Conference Meeting Room',
    },
    {
      id: 3,
      src: './img/gallery3.png',
      category: 'Common Areas',
      alt: 'Library Room',
    },
    {
      id: 4,
      src: './img/gallery4.png',
      category: 'Private Offices',
      alt: 'Dark Office Setup',
    },
    {
      id: 5,
      src: './img/gallery5.png',
      category: 'Common Areas',
      alt: 'Social Kitchen',
    },
    {
      id: 6,
      src: './img/gallery6.png',
      category: 'Private Offices',
      alt: 'Minimalist Desk Setup',
    },
  ];

  // فلترة الصور ديناميكياً باستخدام computed
  filteredImages = computed(() => {
    const currentCategory = this.activeCategory();
    if (currentCategory === 'All Spaces') {
      return this.allImages;
    }
    return this.allImages.filter((img) => img.category === currentCategory);
  });

  setCategory(category: string) {
    this.activeCategory.set(category);
  }
}
