import React from 'react';
import '../App.css';
import {AXIOS} from "../ApiConfig";
import {DateUtil} from '../Utils/DateUtil'
import './styles.css'

export default class GitHubRepos extends React.Component {
    state = {
        repos: [],
        isLoading: true,
    };

    getAllRepoViews = (user, repoInfo) => {

        return AXIOS(`/repos/${user}/${repoInfo.name}/traffic/views`).then(({count, uniques}) => ({
            "id":repoInfo.id,
            "name":repoInfo.name,
            count,
            uniques,
            "created_at": DateUtil.formatDate(repoInfo.created_at)
        }))
    }




    getRepoList = (user) => (
        AXIOS(`users/${user}/repos`).then(repoList => {
            const repos = repoList.map((repo) => this.getAllRepoViews(user, repo));
            Promise.all(repos).then(repos => {
                this.setState({
                    repos,
                    isLoading: false,
                })
            })
        })
    )

    componentDidMount() {
        this.getRepoList("Dariaaa");
    }

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    renderRepos() {
        return (
            <>
                <div className="repo repo-title">
                    <tr>
                        <td className="number">№</td>
                        <td className="name">Repo name</td>
                        <td className="date">Created at</td>
                        <td className="number">Views</td>
                        <td className="number">Unique views</td>
                    </tr>
                </div>
            {this.state.repos.map((repo, index) =>
                <div key={repo.id} className="repo">
                    <tr>
                        <td className="number">{index + 1}</td>
                        <td className="name">{repo.name}</td>
                        <td className="date">{repo.created_at}</td>
                        <td className="number">{repo.count}</td>
                        <td className="number">{repo.uniques}</td>
                    </tr>
                </div>
            )}
            </>
        )
    }

    render() {
        return this.state.isLoading ? this.renderLoading() : this.renderRepos()
    }
}
