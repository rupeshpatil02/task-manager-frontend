 export interface Errors {
    title?: string;
    description?: string;
    category?: string;
    date?:string;
    priority?:string;

}

export function validateTaskForm(title: string, description: string, category: string,date:string,priority:string): Errors | null {
    const errors: Errors = {};
    if (!title.trim()) {
        errors.title = 'Title is required';
    }
    if (!description.trim()) {
        errors.description = 'Description is required';
    }
    if (!category.trim()) {
        errors.category = 'Category is required';
    }
    if(!date){
        errors.date="Date is required"
    }
    if(!priority){
        errors.priority=("Priority is required")
    }
    return Object.keys(errors).length > 0 ? errors : null;
}
