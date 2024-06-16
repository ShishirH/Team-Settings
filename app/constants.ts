import {createClient} from "@supabase/supabase-js";

export const firstNamesArr : string[] = [
    'Jack',
    'Olivia',
    'Phoenix',
    'Lana',
    'Demi',
    'Candice',
    'Natali',
    'Drew',
    'Orlando',
    'Andi',
    'Kate'
]

export const lastNamesArr : string[] = [
    'Rhye',
    'Baker',
    'Steiner',
    'Wilkinson',
    'Wu',
    'Craig',
    'Cano',
    'Diggs',
    'Lane',
    'Morrison',
    'Loan'
]

export const roles: string[] = [
    'Product Designer',
    'Product Manager',
    'Backend Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'UX Designer',
    'UX Copywriter',
    'UI Designer',
    'Product Manager',
    'QA Engineer',
    'Tech Lead'
]

export const supabase = createClient('https://qmitjmnevadahrmwfkqj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXRqbW5ldmFkYWhybXdma3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NTcyNDIsImV4cCI6MjAzNDEzMzI0Mn0.AmwvgcgBoNUlxZ_vmfKH_W08mfuxkrNtRZOO5r--g34')
