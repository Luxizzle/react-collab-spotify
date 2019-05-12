import { firebase as firebaseConfig } from '../../config';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig.config);
