import { Component, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';


interface colMask {
  header: string;
  values: string[];
}

//import { DataTable } from "simple-datatables";

@Component({
  tag: 'network-table',
  styleUrl: 'network-table.css',
  shadow: true
})
export class networkTable {
  @Prop() data?:any;
  @Prop() hood?:any;
  @Prop() height?:string='400px';
  @Event() tableCellSelectEvent: EventEmitter;
  @Element() private element: HTMLElement;

  tableDiv;HTMLElement;
  
  // Hiding some Rows, that match hood Prop content
  // One column can be considered
  @Watch('hood')
  shadowRows(newShadow?: colMask/*, oldData: undefined|object*/){
    let currentHeaders = this.data[0];
    let tBody = this.element.shadowRoot.querySelector('.body');
    // Get corresponding Header position    
    let index = newShadow  ? currentHeaders.indexOf(newShadow.header): 0;
    // Set an empty selector values if prop changed to undefine
    let values = newShadow ? newShadow.values : [];
    Array.from(tBody.querySelectorAll('tr'))
    .filter((tr)=> {
        tr.classList.remove("shadow"); 
        let cVal = tr.querySelectorAll('td')[index].textContent;
        return values.includes(cVal);
      })
      .forEach((tr)=>{       
        tr.classList.add('shadow')
      });
      
  }
//  @Watch('data')
  //buildTable(newData: object[]/*, oldData: undefined|object*/){
  /*  this.tableDiv = this.element.shadowRoot.querySelector('.table');
    console.log(newData);
    DataTable()
  }
*/
  checkInput() {
    if(! this.data) {
      console.warn("data is not defined");
      console.dir(this.data);
      return false;
    }
    if (! (this.data.constructor === Array)) {
      console.warn("data is not an array");
      console.dir(this.data);
      return false;
    }
    return true;
  }

  render() {
    if(!this.checkInput())
      return <div/>;

    let rows = [];
    let head = this.data[0].map((e)=><td>{e} <i class="fas fa-arrow-up"></i></td>);
    this.data.forEach((row, i) => {
      if (i == 0)
        return;
      let cells = row.map((e)=> <td>{e}</td>)
      rows.push(<tr>{cells}</tr>);
    });
    return <div class="frame">
            <div class="header">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"><i class="fas fa-search fa-right"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Keyword" aria-label="Keyword" aria-describedby="basic-addon1"/>
              </div>
            </div>
    <div class="head"><table class="table table-borderless table-sm"><tr>{head}</tr></table></div><div class="body"><table class="table table-striped network-table table-borderless table-sm"><tbody>{rows}</tbody>      
    </table></div></div>;
    /*return <div class="frame"><table class="table table-striped"></table></div>;*/
  }

  filter(value){
    let tBody = this.element.shadowRoot.querySelector('.body');

    let re = new RegExp(value);
    Array.from(tBody.querySelectorAll('.body tr'))
      .filter((tr) =>  !tr.classList.contains('shadow') ) // skip currently shadowed row
      .forEach((tr)=>{
        let status = 'collapse';
        Array.from(tr.querySelectorAll('td')).forEach((td)=>{
          if (re.test(td.textContent)) 
            status = 'visible';
        })
        tr.setAttribute('style','visibility:' + status);
      });
  }

  sortTable(index, up){   
    let re = /^([0-9]*[.])?[0-9]+$/;
    let rows = this.element.shadowRoot.querySelectorAll('.body table tr');
    var sortedRows = Array.from(rows).sort((a, b)=> {
      let x = a.querySelectorAll('td')[index].innerHTML.toLocaleLowerCase();
      let y = b.querySelectorAll('td')[index].innerHTML.toLocaleLowerCase();
      //console.log(x + ',' + y) ;
      if(re.test(x) && re.test(y)){
        //console.log("Numbers");
        return up ? parseFloat(x) - parseFloat(y): parseFloat(y) - parseFloat(x);
      }
      return up ? x.localeCompare(y) : y.localeCompare(x);
      });
    for (let nRow of sortedRows) {
      this.element.shadowRoot.querySelector('.body table tbody').appendChild(nRow);
    }
  }
  componentDidUpdate() {
    let tBody = this.element.shadowRoot.querySelector('.body');//.style.height=this.height;
    tBody.setAttribute('style', "max-height:" + this.height);

    let y = this.element.shadowRoot.querySelector('input');
    let self = this;
    y.addEventListener('input', function(){self.filter(this.value)});

    let z = Array.from(this.element.shadowRoot.querySelectorAll('.head td'));
    z.forEach((th, index)=>{
      th.addEventListener('click', function(){
        let up = false;
        let i = th.querySelector('i');
        if( i.classList.contains('fa-arrow-up')) {
          up = true;
          i.classList.replace('fa-arrow-up', 'fa-arrow-down');
        } else {
          i.classList.replace('fa-arrow-down', 'fa-arrow-up');
        }
        self.sortTable(index,up);
      });
    });

    let cells = Array.from(this.element.shadowRoot.querySelectorAll('.body tr'));
    cells.forEach((e)=>{
      e.addEventListener('click', function(){
        self.tableCellSelectEvent.emit(Array.from(e.querySelectorAll('td')).map((td)=>td.innerHTML));
      });

    });
  }
}
