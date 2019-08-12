import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus = 'No server was created';
  serverName = 'testServer';
  username = '';
  serverCreated = false;
  servers = ['Testserver', 'TestServer 2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() { 
    this.servers.push(this.serverName);
    this.serverCreated = true;
    this.serverCreationStatus = "Server was created! Name is " + this.serverName;

  }

  onUpdateServerName(event: any) { 
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  checkUserEmpty() { 
    if( this.username === '' ) { 
      return true;
    }
    return false;
  }

  timeStamps: number[] = [];
  
  toggle() { 

    this.timeStamps.push(new Date().getTime());

  }
}
