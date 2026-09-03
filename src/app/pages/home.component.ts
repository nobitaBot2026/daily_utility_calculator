import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TOOLS } from "../data";
@Component({ standalone: true, imports: [CommonModule, RouterLink, FormsModule], templateUrl: "./home.component.html" })
export class HomeComponent {
    tools = TOOLS;
    query = "";
    categories = [
        ["🎓", "Students", "Learn, calculate and plan"],
        ["💼", "Job & Office", "Salary and work utilities"],
        ["🏠", "Daily Life", "Money and everyday calculations"],
        ["🛒", "Shopkeeper", "Simple business calculations"],
        ["🧮", "Daily Tools", "Fast everyday converters"],
    ];
    get filtered() {
        const q = this.query.trim().toLowerCase();
        return q ? this.tools.filter((t) => (t.name + " " + t.desc + " " + t.keywords).toLowerCase().includes(q)) : this.tools.slice(0, 6);
    }
    constructor(){
        console.log(this.tools);
        
    }
}
