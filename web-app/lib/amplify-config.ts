import { Amplify } from 'aws-amplify';
import outputs from '../public/amplify_outputs.json';

// Configure Amplify with the outputs from the backend
Amplify.configure(outputs, { ssr: true });

export { Amplify };
