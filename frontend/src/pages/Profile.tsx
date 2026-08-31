import { Header } from '../components/Header'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyProfile, saveMyProfile, type UserProfileData } from '../routes/api'
import { uploadImageToCloudinary } from '../utils/cloudinary'

export const Profile = () => {
    const { user } = useAuth();
    const [existingProfile, setExistingProfile] = useState<UserProfileData | null>(null);
    const [img, setImg] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        getMyProfile(user.id).then((profile) => {
            if (!profile) return;
            setExistingProfile(profile);
            setImg(profile.img || '');
        }).catch(() => console.log('failed to load profile'));
    }, [user]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError('');
        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setImg(url);
        } catch {
            setUploadError('failed to upload image');
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // merge onto whatever profile already exists so we don't clobber other fields
        const data: UserProfileData = {
            ...existingProfile,
            userId: user.id,
            maxDistance: existingProfile?.maxDistance ?? 50,
            img,
        };

        setSaving(true);
        try {
            await saveMyProfile(data);
        } catch {
            console.log('unable to save profile');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex flex-col items-center px-4 pb-10">
            <Header />
            <div className="bg-slate-800 rounded-md p-4 w-full max-w-xl flex flex-col items-center gap-4">
                <h1 className="text-3xl">Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
                    <label>profile photo</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    {uploading && <p className="text-slate-400 text-sm">uploading...</p>}
                    {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}
                    {img && !uploading && (
                        <img src={img} alt="profile preview" className="w-32 h-32 object-cover rounded-md" />
                    )}

                    <button type="submit" disabled={uploading || saving}>
                        {saving ? 'saving...' : 'save'}
                    </button>
                </form>
            </div>
        </div>
    )
}
