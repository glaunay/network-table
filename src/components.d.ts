/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface NetworkTable {
    'data'?: any;
    'height'?: string;
    'hood'?: any;
  }
  interface NetworkTableAttributes extends StencilHTMLAttributes {
    'data'?: any;
    'height'?: string;
    'hood'?: any;
    'onTableCellSelectEvent'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'NetworkTable': Components.NetworkTable;
  }

  interface StencilIntrinsicElements {
    'network-table': Components.NetworkTableAttributes;
  }


  interface HTMLNetworkTableElement extends Components.NetworkTable, HTMLStencilElement {}
  var HTMLNetworkTableElement: {
    prototype: HTMLNetworkTableElement;
    new (): HTMLNetworkTableElement;
  };

  interface HTMLElementTagNameMap {
    'network-table': HTMLNetworkTableElement
  }

  interface ElementTagNameMap {
    'network-table': HTMLNetworkTableElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
