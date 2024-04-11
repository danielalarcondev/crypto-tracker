import { Routes } from '@utils/routes';
import { redirect } from 'next/navigation';
 
export default function AppPage() {
    redirect(Routes.DEFAULT);
}
