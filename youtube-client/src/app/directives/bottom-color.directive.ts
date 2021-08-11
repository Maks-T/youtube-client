import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBottomColor]',
})
export class BottomColorDirective implements OnInit {
  @Input() public cardColor!: string;
  @HostBinding('style.borderBottomColor') public borderBottomColor: string =
    this.cardColor;

  ngOnInit(): void {
    this.borderBottomColor = this.cardColor;
  }
}
