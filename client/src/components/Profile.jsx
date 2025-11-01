import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserHeader } from './UserHeader';
import ProfileNav from './profileComponents/ProfileNav';
import './Profile.css';

export const Profile = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem('authToken');
		if (!token) {
			navigate('/login');
			return;
		}
	}, [navigate]);

	return (
		<>
			<UserHeader />
			<main className="profile-page">
				<div className="profile-container">
					<h1 className="profile-title">Perfil</h1>
					<ProfileNav />
					<div style={{ marginTop: 8 }}>
						<Outlet />
					</div>
				</div>
			</main>
		</>
	);
};

export default Profile;

