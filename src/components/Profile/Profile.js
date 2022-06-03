import { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';
import { FollowContext } from '../../store/FollowContext';
import { PostContext } from '../../store/PostContext';
import ProfileBoard from './ProfileBoard';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPost } from '../../store/posts';
import { selectMyFollower, selectMyFollowing } from '../../store/follows';
const Profile = () => {
    const { name, img, id } = useSelector((state) => state.users.me);
    console.log(name, img, id);
    const myPosts = useSelector((state) => state.posts.myPosts);
    /*     const { posts, deletePost } = useContext(PostContext); */

    const follower = useSelector((state) => {
        console.log(state);
        return state.follows.myFollower;
    });
    const following = useSelector((state) => state.follows.myFollowing);
    console.log(follower);
    const dispatch = useDispatch();
    const getMyPost = () => {
        dispatch(selectMyPost());
    };
    const myFollower = () => {
        console.log('1');
        dispatch(selectMyFollower());
        // return follows.filter((follow) => follow.following === id);
    };
    const myFollowing = () => {
        dispatch(selectMyFollowing());
        // return follows.filter((follow) => follow.follower === id);
    };
    useEffect(() => {
        getMyPost();
        myFollower();
        myFollowing();
    }, []);
    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody img={img} follower={follower} following={following} posts={myPosts.posts} name={name}></ProfileBody>
                <ProfileBoard posts={myPosts.posts} name={name} img={img} postState={myPosts}></ProfileBoard>
            </Container>
        </>
    );
};
export default Profile;
