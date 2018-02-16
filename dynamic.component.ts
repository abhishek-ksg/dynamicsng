import { ComponentInjector } from './component-injector';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  OnChanges,
  Provider,
  SimpleChanges,
  ReflectiveInjector,
  StaticProvider,
  Type,
  ViewContainerRef,
  Inject
} from '@angular/core';

@Component({
  selector: 'ndc-dynamic',
  template: ''
})
export class DynamicComponent implements OnChanges, ComponentInjector {

  @Input() ndcDynamicComponent: Type<any>;
  @Input() ndcDynamicInjector: Injector;
  @Input() ndcDynamicProviders: StaticProvider[];
  @Input() ndcDynamicContent: any[][];

  componentRef: ComponentRef<any> | null;

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ndcDynamicComponent']) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this._vcr.clear();
    this.componentRef = null;

    if (this.ndcDynamicComponent) {
      this.componentRef = this._vcr.createComponent(
        this._cfr.resolveComponentFactory(this.ndcDynamicComponent),
        0, this._resolveInjector(), this.ndcDynamicContent
      );
    }
  }

  private _resolveInjector(): Injector {
    let injector = this.ndcDynamicInjector || this._vcr.parentInjector;

    if (this.ndcDynamicProviders) {
      injector = Injector.create(this.ndcDynamicProviders, injector);
    }

    return injector;
  }

}
