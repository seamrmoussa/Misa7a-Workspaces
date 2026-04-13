import { Component } from '@angular/core';

interface Review {
  id: number;
  author: string;
  role: string;
  avatar: string;
  stars: number;
  roomType: string;
  date: string;
  title: string;
  content: string;
}
@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  // للتحكم في الفلتر النشط (Native Binding)
  activeFilter: string = 'All Reviews';

  // مصفوفة الفلاتر لسهولة التعديل
  filters: string[] = ['All Reviews', 'Highest Rated', 'Most Recent'];

  // دالة لتغيير الفلتر
  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  // بيانات المراجعات (Mock Data) مطابقة للتصميم
  reviews: Review[] = [
    {
      id: 1,
      author: 'Marcus Thorne',
      role: 'Senior Architect',
      avatar: 'https://i.pravatar.cc/150?img=11', // مسار صورة افتراضية
      stars: 5,
      roomType: 'THE GLASS LIBRARY',
      date: 'October 14, 2023',
      title: '"A Masterclass in Focused Design"',
      content:
        "The attention to acoustic detail in the Glass Library is unparalleled. As an architect, I'm extremely picky about light quality and sound dampening. The sanctuary delivers a quiet power that allowed me to finish a complex project two days ahead of schedule. The staff treats you like royalty without the fuss.",
    },
    {
      id: 2,
      author: 'Elena Rodriguez',
      role: 'Creative Director',
      avatar: 'https://i.pravatar.cc/150?img=5',
      stars: 5,
      roomType: 'ZEN ATRIUM',
      date: 'September 28, 2023',
      title: '"Inspiration in Every Corner"',
      content:
        "I came here for a brand strategy retreat and left with more clarity than I've had in years. The organic textures of the Secondary Beige palette and the abundance of plants in the Atrium make it feel less like an office and more like a high-end wellness retreat. Truly a sanctuary for the mind.",
    },
    {
      id: 3,
      author: 'Julian Chen',
      role: 'Tech Founder',
      avatar: 'https://i.pravatar.cc/150?img=8',
      stars: 4,
      roomType: 'EXECUTIVE SUITE 04',
      date: 'August 12, 2023',
      title: '"Flawless Tech & Low-Friction"',
      content:
        'Most coworking spaces struggle with the tech basics. Architectural Sanctuary has fiber speeds that never dip and seamless screen sharing that actually works on the first try. The minimalist UI of their booking system matches the physical space—sophisticated and low-friction.',
    },
  ];

  // دالة مساعدة لرسم النجوم حسب التقييم
  getStars(count: number): number[] {
    return Array(count).fill(0);
  }
}
