import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UIStateService {
    isSidebarCollapsed = signal(true);

    toggleSidebar() {
        this.isSidebarCollapsed.update(v => !v);
    }

    expandSidebar() {
        this.isSidebarCollapsed.set(false);
    }

    collapseSidebar() {
        this.isSidebarCollapsed.set(true);
    }
}
